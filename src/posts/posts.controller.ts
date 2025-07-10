import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  createPost(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }
}
