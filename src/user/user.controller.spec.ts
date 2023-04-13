import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { UserController } from './user.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProvidersEnum } from '../utils/enums';
import { User } from './entities/user.entity';
import { Post } from '../post/entities/post.entity';

describe('User Service', () => {
    let controller: UserController;
    let service: UserService;
    let userRepository: Repository<User>;
    let postRepository: Repository<Post>;

    const requsetMock = <any>{
        user : {
            id : 1
        }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers : [UserController],
            providers: [{
                provide : ProvidersEnum.uesrService,
                useValue : {
                    createPost : jest.fn(),
                    getUserPosts : jest.fn(),
                    getUser : jest.fn(),
                }
            }],
        }).compile();

        service = module.get<UserService>(ProvidersEnum.uesrService);
        controller = module.get<UserController>(UserController);
    });

    it('user service should be defined', () => {
        expect(service).toBeDefined();
    });
    it('user controller should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe("Add new post ", ()  => {
        it("should create post" , async() => {
            const createPostParam = {
                title : "title",
                body : "body"
            }
            await controller.addNewPost(createPostParam,requsetMock)
            expect(service.createPost).toHaveBeenCalledWith({...createPostParam,userId : requsetMock.user.id})
        })
    })
    describe("get user's post ", ()  => {
        it("should call getUserPost methode" , async() => {
            const createPostParam = {
                title : "title",
                body : "body"
            }
            await controller.getPosts(requsetMock)
            expect(service.getUserPosts).toHaveBeenCalledWith(requsetMock.user.id)
        })
    })
    describe("sould call getUserPosts ", ()  => {
        it("should get user" , async() => {
            await controller.getUser(requsetMock.user.id)
            expect(service.getUser).toHaveBeenCalledWith(requsetMock.user.id)
        })
    })

    
});
