import { NextFunction, Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import userRepository from '@/repositories/user.repository'

const usersRoute = Router()

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAllUsers()
  res.status(StatusCodes.OK).send(users)
})

usersRoute.get(
  '/users/:uuid',
  async (req: Request, res: Response, next: NextFunction) => {
    const { uuid } = req.params
    const user = await userRepository.findUserByUuid(uuid)
    res.status(StatusCodes.OK).send(user)
  }
)

usersRoute.post(
  '/users',
  (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body
    res.status(StatusCodes.CREATED).send(newUser)
  }
)

usersRoute.put('/users/:uuid', (req: Request, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid
  const updatedUser = req.body

  updatedUser.uuid = uuid

  res.status(StatusCodes.OK).send({ uuid, updatedUser })

})

usersRoute.delete('/users/:uuid', (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(StatusCodes.OK)
})

export default usersRoute
