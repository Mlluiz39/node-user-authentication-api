import db from '@/db'
import User from '@/models/user.model'
import DataBaseError from '@/models/errors/database.error.models'

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const query = `
    SELECT uuid, userName, email
    FROM application_user
    `
    const { rows } = await db.query<User>(query)
    return rows || []
  }

  async findUserByUser(uuid: string): Promise<User> {
    try {
      const query = `
      SELECT uuid, userName, email, password
      FROM application_user
      WHERE uuid = $1
      `
      const values = [uuid]

      const { rows } = await db.query<User>(query, values)
      const [user] = rows

      return user
    } catch (error) {
      console.log(error)
      throw new DataBaseError('Erro na consulta por ID', error)
    }
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

  async updateUser({ userName, email, password, uuid }: User): Promise<void> {
    const script = `
    UPDATE application_user 
    SET 
      userName = $1, 
      email = $2, 
      password = crypt($3, 'my_salt') 
    WHERE uuid = $4
    `
    const values = [userName, email, password, uuid]
    await db.query<User>(script, values)
  }

  async deleteUser(uuid: string): Promise<void> {
    const script = `
    DELETE FROM application_user
    WHERE uuid = $1
    `
    const values = [uuid]
    await db.query<User>(script, values)
  }
}

export default new UserRepository()
