import { NextFunction, Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import userRepository from '@/repositories/user.repository'
import DataBaseError from '@/models/errors/database.error.models'

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
      if (error instanceof DataBaseError) {
        res.sendStatus(StatusCodes.BAD_REQUEST)
      } else {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      }
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
