import { Document } from 'mongoose';
export default interface ICart extends Document {
    userId: string;
    products: [
        {
            productId: string;
            quantity: number;
        }
    ];
    user: string;
    address: [
        {
            name: string;
            mobileNumber: string;
            pinCode: string;
            locality: string;
            address: string;
            cityDistrictTown: string;
            state: string;
            landmark: string;
            alternatePhone: string;
            addressType: string;
        }
    ];
}
