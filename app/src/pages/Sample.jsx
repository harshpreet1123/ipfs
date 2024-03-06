import React from "react";
import { useState } from "react";
import FormData from "form-data";
import axios from "axios";

const Sample = () => {
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState(null);
  const pinataJWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmYjIxZGViMC0xNWQzLTRmMDMtOWNkMS00Yjc4MDIzMzBkNjQiLCJlbWFpbCI6ImhhcnNocHJlZXQuNzV3YXlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjI3MzE3MjNmMWUwYmExMjllNWEwIiwic2NvcGVkS2V5U2VjcmV0IjoiYTk0ZWZmMjNmNGEyNDU0ZDE3NjE3YWY1MjI3MGVjZDg5M2YxMGI2OWEwNDI1Mzk5ODc0YTZlZGJiMTRiMzQ0NCIsImlhdCI6MTcwOTIwMDA3MH0.kI5_9Ihjy9kUN95aVGpD5jeMNCLS_3SkVgZLtCew7Vs";

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (selectedFile) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const pinataMetadata = JSON.stringify({ name: title });
        formData.append("pinataMetadata", pinataMetadata);
        const pinataOptions = JSON.stringify({ cidVersion: 0 });
        formData.append("pinataOptions", pinataOptions);
        const res = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: Infinity,
            headers: {
              "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: `Bearer ${pinataJWT}`,
            },
          }
        );
        console.log(res.data);
        return res.data;
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Select a image to upload");
    }
  };
  const handleSave = async () => {
    const res= await uploadImage();
    setIpfsHash(res.IpfsHash);
    try {
      var response = await axios.post("http://localhost:5000/add", {
        title: title,
        img: `ipfs.io/ipfs/${ipfsHash}`,
      });
    } catch (e) {
      console.error(e);
    } finally {
      console.log(`${title}\n${ipfsHash}`);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <span>Title: </span>
      <input
        type="text"
        required
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      <br />
      <br />
      <input
        type="file"
        accept="image/png,image/jpg,image/jpeg,"
        onChange={handleFileSelect}
        required
      ></input>
      <br />
      <br />
      <br />
      <button type="submit" onClick={handleSave}>
        Save Data
      </button>
    </div>
  );
};

export default Sample;
