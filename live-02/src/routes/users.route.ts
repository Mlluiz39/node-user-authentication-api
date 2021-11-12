import { NextFunction, Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import User  from '@/models/user.model'

const usersRoute = Router()

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
  const users: User[] = [
    { userName: 'Marcelo Luiz', email: 'mluiz@gmail.com', password: '123456' },
  ]
  res.status(StatusCodes.OK).send(users)
})

usersRoute.get(
  '/users/:uuid',
  (req: Request<User>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    res.status(StatusCodes.OK).send({ uuid })
  }
)

usersRoute.post(
  '/users',
  (req: Request<User>, res: Response, next: NextFunction) => {
    const newUser = req.body
    res.status(StatusCodes.CREATED).send(newUser)
  }
)

usersRoute.put('/users/:uuid', (req: Request<User>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid
  const updatedUser = req.body

  updatedUser.uuid = uuid

  res.status(StatusCodes.OK).send({ uuid, updatedUser })

})

usersRoute.delete('/users/:uuid', (req: Request<User>, res: Response, next: NextFunction) => {
  res.sendStatus(StatusCodes.OK)
})

export default usersRoute
