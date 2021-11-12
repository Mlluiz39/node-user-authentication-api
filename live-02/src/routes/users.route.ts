import { NextFunction, Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import userRepository from '@/repositories/user.repository'

const usersRoute = Router()

usersRoute.get(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers()
    res.status(StatusCodes.OK).send(users)
  }
)

usersRoute.get(
  '/users/:uuid',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { uuid } = req.params
      const user = await userRepository.findUserByUser(uuid)
      res.status(StatusCodes.OK).send(user)
    } catch (error) {
      next(error)
    }
  }
)

usersRoute.post(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body
    const uuid = await userRepository.createUser(newUser)
    res.status(StatusCodes.CREATED).send(uuid)
  }
)

usersRoute.put(
  '/users/:uuid',
  async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    const updatedUser = req.body

    updatedUser.uuid = uuid
    await userRepository.updateUser(updatedUser)
    res.status(StatusCodes.OK).send({ uuid, updatedUser })
  }
)

usersRoute.delete(
  '/users/:uuid',
  async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    await userRepository.deleteUser(uuid)
    res.sendStatus(StatusCodes.OK)
  }
)

export default usersRoute
