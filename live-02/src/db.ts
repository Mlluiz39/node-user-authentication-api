import { Pool } from 'pg'
const connectionString = 'postgres://dwgmfkdc:U5lpXAVY87yIBWqzYJkOhDH5QioDkmR9@kesavan.db.elephantsql.com/dwgmfkdc'
const pool = new Pool({
  connectionString,
})

export default pool