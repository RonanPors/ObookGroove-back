import Joi from 'joi';

export default Joi.object({
  pseudo: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    // Définir une longueur minimale de 8 caractères
    .min(8)
    // Doit contenir au moins une majuscule
    .pattern(new RegExp('(?=.*[A-Z])'))
    // Doit contenir au moins une minuscule
    .pattern(new RegExp('(?=.*[a-z])'))
    // Doit contenir au moins un chiffre
    .pattern(new RegExp('(?=.*[0-9])'))
    // Doit contenir au moins un caractère spécial
    .pattern(new RegExp('(?=.*[!@#$%^&*])'))
    .required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
}).required();
