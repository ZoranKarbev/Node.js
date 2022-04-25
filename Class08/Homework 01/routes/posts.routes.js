const router = require("express").Router();
const PostsController = require("../controllers/posts.controller");
const sessionValidator = require("../middleware/session-validator-middleware");
const adminValidator = require("../middleware/admin-validator")

router.use(sessionValidator);

//1.Get all Posts
router.get("/all", PostsController.getAllPosts);

//2. Get Post by Id
router.get("/:id", PostsController.getPostByID);

//3. Create new Post
router.post("/add", PostsController.createNewPost);

//4. Update Post
router.put("/:id/update", adminValidator, PostsController.updatePost);

//5. Delete Post
router.delete("/:id", adminValidator, PostsController.deletePost);

module.exports = router;