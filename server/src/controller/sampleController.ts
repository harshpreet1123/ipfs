import SampleModel, { ISample } from "../model/smaple"

const sampleController = async (req: any, res: any) => {
  try {
    const sampleData: ISample = new SampleModel({
      title: req.body.title,
      img: req.body.img,
    });
    const newData = await SampleModel.create(sampleData);
    res.status(201).json({ message: "Success", data: newData });
  } catch (e) {
    console.log("Error: ", e);
  }
};
export default sampleController;
