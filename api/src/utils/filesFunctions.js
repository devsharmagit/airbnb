import fs from "fs/promises";
import path from "path";

const imageDir = path.join(process.cwd(), "images")

export const deleteImage = async(imageName)=>{
    try{
        const filePath = path.join(imageDir, imageName)
        // Check if the file exists
        await fs.access(filePath, fs.constants.F_OK);

        // Delete the file
        await fs.unlink(filePath);
    }catch(error){
    console.log(error)
    }
}

export const imageNameConstructor = (imageName)=>{
    const image = imageName.split(".")
    return image[0] + `${Date.now()}` + "." + image[1]
}