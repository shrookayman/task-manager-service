import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const validateDto = (DtoClass) => {
  return async (req, res, next) => {
    const dto = plainToInstance(DtoClass, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(400).json({
        errors: errors.map(err => ({
          field: err.property,
          errors: Object.values(err.constraints)
        }))
      });
    }

    req.body = dto;
    next();
  };
};


import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Invalid token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

