import React, { useRef } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import styled from 'styled-components';
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { storage } from "@/FirebaseConfig";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { validateNotLoggedInUser } from "../utility/protectRoutes";
import snackbar from "../utility/snackbar";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable } from "firebase/storage";


const CardContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:100vh;
    width:fullWidth;
    background-color: lightblue;
`;
const CardStyle = styled.div`
    background-color:#fff;
    border-radius:8px;
    box-shadow:0 4px 8px rgba(0,0,0,0.1);
    padding:20px;
    // height:550px;
    width:50%;
    max-width:400px;
    text-align:center; 
    box-sizing:border-box;
`

export function ListProperty() {
    validateNotLoggedInUser();
    const navigate = useNavigate()

    const [files, setFiles] = useState(null);
    const [imagePaths, setImagePaths] = useState([]);
    const title = useRef();
    const location = useRef();
    const price = useRef();
    const description = useRef();
    const listType= useRef('RENT')
   


    console.log(files, imagePaths);

    const onImgChange = event =>{
        console.log('this is event',event)
        if(event.target.files){
            setFiles(event.target.files);
            let imagePathList = [];
            for(const file of event.target.files){
                imagePathList.push(URL.createObjectURL(file));
            }
            setImagePaths(imagePathList)
            console.log(imagePathList)
        }
        console.log(imagePaths)
    }

    const handleOnSubmit = async(ev)=>{
        ev.preventDefault();
        // console.log("these are values",title, location, price, description, listType);
        let imgList = [];
        console.log(files)            
        for(const file of files){
            console.log('this is my file',file,file.name.split('.').pop())
            const fileExt = file.name.split('.').pop();
            const randomFileName = `${uuidV4()}.${fileExt}`;
            const storageRef = ref(storage,`/properties/${randomFileName}`)
            const upload = uploadBytesResumable(storageRef,file)
            imgList.push(`https://firebasestorage.googleapis.com/v0/b/my-projects-653c4.appspot.com/o/properties%2F${randomFileName}?alt=media&token=0f45293e-1e15-49c6-8293-7f6aa13aad6e`)
            console.log(upload)
        }


        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/property`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title:title.current.value,
                location:location.current.value,
                price:price.current.value,
                description:description.current.value,
                listType:listType.current,
                imgList:imgList
            }),
            credentials:'include'
        })
        const data = await response.json();
        if(response.status == 201){
            snackbar('success',data.message)
            return navigate("/")
        }else{
            snackbar('error', data.error)
        }

         
    }

    return (
        <CardContainer>
        <CardStyle>
        <form onSubmit={handleOnSubmit}>
            <CardHeader>
                <CardTitle>List Your Property</CardTitle>
                <CardDescription>Give the Details of your Property</CardDescription>
            </CardHeader>
            <CardContent>
               
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                        <ImageGallery imgPaths={imagePaths} />
                            <Label htmlFor="name">Upload your property pics</Label>
                            <input className="list-property-img-input" type="file" accept="image/*" onChange={onImgChange} multiple />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Listing Type</Label>
                            
                            <RadioGroup onChange={(ev)=>listType.current=ev.target.value}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="RENT" id="RENT" />
                                    <Label htmlFor="RENT">Rent</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="SELL" id="SELL" />
                                    <Label htmlFor="SELL">Sell</Label>
                                </div>
                            </RadioGroup>   
                                <Input type="text" placeholder="Title"  ref={title} required />
                                <Input type="text" placeholder="Enter Location"  ref={location} required />
                                <Input type="number" placeholder="Price"  ref={price} required/>
                                <Textarea placeholder="Description" ref={description} required/>
                        </div>
                    </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" type="submit">Post</Button>
            </CardFooter>
            </form>
            </CardStyle>
        </CardContainer>
    )
}

function ImageGallery({imgPaths}){
    if(imgPaths && imgPaths.length > 0){
        return (
            <div className="list-property-gallery">
                {
                    imgPaths.map(imgPath => (
                        <div className="list-property-gallery-img">
                            <img src={imgPath} alt="" />
                        </div>
                    ))
                }
            </div>
        )
    }
}



export default ListProperty;