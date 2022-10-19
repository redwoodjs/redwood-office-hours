import { exec } from 'child_process'
import path from 'path'

export default async ({ args }) => {
  console.log(':: Executing script to load world cities from csv ::')
  console.log(args)
  console.log()
  exec(
    `sh ${path.join(__dirname, 'pgcopy_world_cities_csv.sh')}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.error(`stderr: ${stderr}`)
    }
  )
}
