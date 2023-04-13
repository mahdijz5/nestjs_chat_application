import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post, User } from '../entities';
import { Repository } from 'typeorm';
import { promises } from 'dns';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

describe('User Service', () => {
    let service: UserService;
    let userRepository: Repository<User>;
    let postRepository: Repository<Post>;

    const USER_REPOSITORY_TOKEN = getRepositoryToken(User)
    const POST_REPOSITORY_TOKEN = getRepositoryToken(Post)

    let postMock: Post = {
        id: 1,
        title: "title",
        body: "test Body",
        user: null
    }
    let userMock: User = {
        id: 1,
        username: "mahdijz5",
        email: "test@test.test",
        password: "password",
        posts: []
    }
    postMock.user = userMock
    userMock.posts.push(postMock)


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, {
                provide: USER_REPOSITORY_TOKEN,
                useValue: {
                    findOneBy: jest.fn((x) => Promise.resolve(userMock)),
                }
            }, {
                    provide: POST_REPOSITORY_TOKEN,
                    useValue: {
                        find: jest.fn((x) => Promise.resolve([postMock])),
                        findOne: jest.fn((x) => Promise.resolve(postMock)),
                        remove: jest.fn(),
                        save: jest.fn(),
                        create: jest.fn((x) => Promise.resolve(postMock)),
                    }
                }],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN)
        postRepository = module.get<Repository<Post>>(POST_REPOSITORY_TOKEN)
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('userRepository should be defined', () => {
        expect(userRepository).toBeDefined()
    })
    it('postRepository should be  defined', () => {
        expect(postRepository).toBeDefined()
    })

    describe('getUser', () => {
        it("it should get user by id", async () => {
            const reponse = jest.spyOn(userRepository, "findOneBy")
            await service.getUser(1)
            expect(reponse).toHaveBeenCalledWith({ id: 1 })
        })
        it("it should throw not found error for not existing post", async () => {
            jest.spyOn(userRepository, "findOneBy").mockReturnValueOnce(undefined)
            try {
                expect(await service.getUser(1)).toThrow(new NotFoundException())
            } catch (error) {
                expect(error.status).toBe(404)
            }
        })
    })

    describe('createPost', () => {
        let params = {
            userId: 2,
            title: "String",
            body: "String",
        }
        let createPostParams = {
            title: "String",
            body: "String",
        }
        it("it should get user by id then create post", async () => {
            await service.createPost(params)
            expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 2 })
            expect(postRepository.create).toHaveBeenCalledWith({ ...createPostParams, user: userMock })
            expect(postRepository.save).toHaveBeenCalled()
        })
        it("it should throw bad requset error for not existing post", async () => {
            jest.spyOn(userRepository, "findOneBy").mockReturnValueOnce(undefined)
            try {
                expect(await service.createPost(params)).toThrow(new NotFoundException())
            } catch (error) {
                expect(error.status).toBe(400)
            }
        })
 
    })

    describe('updatePost', () => {
        let userID = userMock.id
        let updatePostparams = {
            id: 1,
            title: "String",
            body: "String",
        }
        it("it should get user by id then update post", async () => {
            await service.updatePost(userID, updatePostparams)
            expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: userID })
            expect(postRepository.findOne).toHaveBeenCalledWith({ relations: ['user'], where: { id: userID } })
            expect(postRepository.save).toHaveBeenCalledWith(postMock)
        })
        it("it should throw error for not being owner of post", async () => {
            try {
                userID = 3
                expect(await service.updatePost(userID, updatePostparams)).toThrow(new UnauthorizedException())
            } catch (error) {
                expect(error.status).toBe(401)
            }
        })
        it("it should throw bad requset error for not existing user", async () => {
            jest.spyOn(userRepository, "findOneBy").mockReturnValueOnce(undefined)
            try {
                expect(await service.updatePost(userID, updatePostparams)).toThrow(new NotFoundException())
            } catch (error) {
                expect(error.status).toBe(400)
            }
        })
        it("it should throw not found error for not existing post", async () => {
            jest.spyOn(postRepository, "findOne").mockReturnValueOnce(undefined)
            try {
                expect(await service.updatePost(userID, updatePostparams)).toThrow(new NotFoundException())
            } catch (error) {
                expect(error.status).toBe(404)
            }
        })
    })

    describe('remove repository', () => {
        let userID = userMock.id
        let postID = postMock.id
        it("it should get user by id then update post", async () => {
            await service.removePost(userID, postID)
            expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: userID })
            expect(postRepository.findOne).toHaveBeenCalledWith({ relations: ['user'], where: { id: userID } })
            expect(postRepository.remove).toHaveBeenCalledWith(postMock)
        })
        it("it should throw error for not being owner of post", async () => {
            userID = 3
            try {
                expect(await service.removePost(userID, postID)).toThrow(new UnauthorizedException())
            } catch (error) {
                expect(error.status).toBe(401)
            }
        })
        it("it should throw bad requset error for not existing user", async () => {
            jest.spyOn(userRepository, "findOneBy").mockReturnValueOnce(undefined)
            try {
                expect(await service.removePost(userID, postID)).toThrow(new NotFoundException())
            } catch (error) {
                expect(error.status).toBe(400)
            }
        })
        it("it should throw not found error for not existing post", async () => {
            jest.spyOn(postRepository, "findOne").mockReturnValueOnce(undefined)
            try {
                expect(await service.removePost(userID, postID)).toThrow(new NotFoundException())
            } catch (error) {
                expect(error.status).toBe(404)
            }
        })
    })
});
