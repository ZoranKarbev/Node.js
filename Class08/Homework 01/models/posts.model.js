const path = require("path");
const DataService = require("../services/data.service");
const { v4: uuid } = require("uuid");

const postsPath = path.join(__dirname, "..", "db", "posts.json");

class PostsModel {

    //1. Get All Posts
    static async getAllPosts() {
        return DataService.readJSONFile(postsPath);
    }

    //2. Get Post by ID
    static async getPostByID(postID) {
        const posts = await this.getAllPosts();
        const foundPost = posts.find(post => post.id === postID);
        if (foundPost) {
            return foundPost;
        } else {
            return Promise.reject({ msg: "No post found" })
        }
    }

    //3. Add new Post
    static async addNewPost(newPostData) {
        const posts = await this.getAllPosts();
        const newPost = {
            id: uuid(),
            ...newPostData
        };
        const updatedPosts = [...posts, newPost];
        await DataService.saveJSONFile(postsPath, updatedPosts);
        return newPost;
    }

    //4. Update Post (PATCH or PUT)
    static async updatePost(postID, postUpdateData) {
        const posts = await this.getAllPosts();
        const foundPost = await this.getPostByID(postID);

        const updatedPost = { ...foundPost, ...postUpdateData };
        const updatedPosts = posts.map(post =>
            post.id === foundPost.id ? updatedPost : post
        );

        await DataService.saveJSONFile(postsPath, updatedPosts);

    }

    //5. Delete Post
    static async deletePost(postID) {
        const posts = await this.getAllPosts();

        const updatedPosts = posts.filter(
            post => post.id !== postID
        );
        if (updatedPosts.length === posts.length) {
            return Promise.reject({ msg: "Post not found" })
        }
        await DataService.saveJSONFile(postsPath, updatedPosts);
    }
}

module.exports = PostsModel;