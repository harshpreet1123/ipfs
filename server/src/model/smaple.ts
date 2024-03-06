import { Document, Schema, model } from "mongoose";

export interface ISample extends Document{
    title:string;
    img:string;
}

const SampleSchema = new Schema<ISample>({
    title:{type:String,required:true},
    img:{type:String,required:true}
})

const SampleModel=model<ISample>("Sample",SampleSchema);
export default SampleModel;