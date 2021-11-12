import db from '@/db'
import User from '@/models/user.model'

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const query = `
    SELECT uuid, userName, email
    FROM application_user
    `
    const { rows } = await db.query<User>(query)
    return rows || []
  }

  async findUserByUuid(uuid: string): Promise<User> {
    const query = `
    SELECT uuid, userName, email
    FROM application_user
    WHERE uuid = $1
    `
    const values = [uuid]

    const { rows } = await db.query<User>(query, values)
    const [user] = rows
    
    return user
  }


  async createUser({ userName, email, password }: User): Promise<User> {
    const script = `
    INSERT INTO application_user (
      userName, email, password
      )
      VALUES ($1, $2, crypt($3, 'my_salt'))
      RETURNING uuid
    `
    const values = [userName, email, password]

    const { rows } = await db.query<User>(script, values)
    const [userCreated] = rows

    return userCreated
  }
}

export default new UserRepository()
