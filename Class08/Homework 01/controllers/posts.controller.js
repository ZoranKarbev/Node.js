const PostsModel = require("../models/posts.model");

class PostsController {
    //1.Get all Posts
    static async getAllPosts(req, res) {
        try {
            const posts = await PostsModel.getAllPosts();
            res.status(200).send(posts);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    //2.Get Post by ID
    static async getPostByID(req, res) {
        try {
            const { id: postID } = req.params;
            const post = await PostsModel.getPostByID(postID);
            res.status(200).send(post);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    //3. Add new Post
    static async createNewPost(req, res) {
        try {
            const newPostData = req.body;
            const createdPost = await PostsModel.addNewPost(newPostData);
            res.status(201).send(createdPost);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    //4. Update Post
    static async updatePost(req, res) {
        try {
            const postID = req.params.id;
            const postUpdates = req.body;
            if (postUpdates.id) {
                res.status(400).send({ msg: "Invalid Update" })
            };

            await PostsModel.updatePost(postID, postUpdates);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error)
        }
    }

    //5. Delete Post
    static async deletePost(req, res) {
        try {
            const postID = req.params.id;
            await PostsModel.deletePost(postID);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = PostsController;