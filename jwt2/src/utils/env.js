import dotenc from 'dotenv';
dotenc.config();
export const env={
    PORT:process.env.PORT || 4000,
    JWT_SECRET:process.env.JWT_SECRET ,
    JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN || '15m',
};
if(!env.JWT_SECRET){
    console.log('Missing JWT_SECRET in .env');
    process.exit(1);
};