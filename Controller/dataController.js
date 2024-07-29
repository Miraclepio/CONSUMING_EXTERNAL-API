require("dotenv").config();
const express = require("express");
const dataModel = require("../Models/dataModel");
const axios = require("axios");


// get all data from the external API
// exports.allData = async (req, res)=>{
//     try{
//         const externalDataResponse = await axios.get(process.env.External_api);
//         const externalData=externalDataResponse.data;

       
//         }

    
//         const myData = await dataModel.find();

//         if(externalData.length === 0){
//             res.status(404).json({
//                 message: "No data found."
//             })
//         }else{
//             res.status(200).json({
//                 message: "Data",
//                 external: externalData.data,
//                 local: myData
//             })
//         } 
//     }catch(error){
//         console.log(error)
//     }


// get all data from the external API
exports.allData = async (req, res)=>{
    try{
        const externalDataResponse = await axios.get(process.env.External_api);
        const externalData = externalDataResponse.data

        for (const item of externalData){
            const existingData = await dataModel.findOne({postId: item.id}) 

            if(!existingData){
                const newData = new dataModel({
                    userId: item.UserId,
                    postId: item.id,
                    title: item.title,
                    body: item.body
                })

                await newData.save()
            }
        }

        const myData = await dataModel.find();
        res.status(200).json({
            message: "Data",
            data: myData
        })
    }catch(error){
        console.log(error.message)
    }
}

// get one post
exports.getOne = async (req, res)=>{
    try{
        const id = req.params.id;
        const post = await dataModel.findOne({postId: id})
        res.status(200).json({
            message: `Post with id: ${id} is found.`,
            data: post
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

// create a post
exports.createPost = async (req, res)=>{
    try{
        const externalDataResponse = await axios.get(process.env.External_api, req.body);
        const newData =  new dataModel({
            userId: req.body.UserId,
            postId: req.body.postId,
            title: req.body.title,
            body: req.body.body
        });

        await newData.save();
        res.status(201).json({
            message: "Created successfully", 
            data: newData
        })
    }catch(error){
        res.status(500).json({
            message: error.message  
        
        })
    }
}



// Update a post
exports.updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedData = {
            
            title: req.body.title,
            body: req.body.body
        };

        const post = await dataModel.findOneAndUpdate({postId:postId},updatedData, { new: true });

        if (!post) {
            res.status(404).json({
                message: `Post with id: ${postId} not found.` 
            });
        } 
            res.status(200).json({
                message: `Post with id: ${postId} has been updated.`, 
                data: post
            });
        
    } catch (error) {
        res.status(500).json({
            message: error.message

        });
    }
};



// delete a post

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
       
        const deletedPost = await dataModel.findOneAndDelete({postId:postId});

        if (!deletedPost) {
            res.status(404).json({
                message: `Post with id: ${postId} not found.`  
            });
        } 
           return res.status(200).json({
                message: `Post with id: ${postId} has been deleted.`,
                
            });
        
    } catch (error) {
        res.status(500).json({
            message: error.message 
        });
    }
};



// update
// exports.updatePost = async (req,res) => {
//     try {
//         const postId= req.params.id;
//         const updatedData = await dataModel.findOneAndUpdate({postId:postId},req.body,{new:true});
//         if(updatedData){
//             res.status(200).json({
//                 message:`Post with ID: ${postId} has been updated successfully.`,
//                 data:updatedData
//             })
//         }else{
//             res.status(404).json({
//                 message:`Post with ID: ${postId} not found.`
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             message:error.message
//         })
//     }
// }