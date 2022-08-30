import { useRouter } from 'next/router'
import Quizcard from '../../Components/quizcard'

const Type = () => {
  const router = useRouter()
  const { type } = router.query
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",router.query)
  return <Quizcard isAnswer={type === "answer"}  /> 
}

export default Type
