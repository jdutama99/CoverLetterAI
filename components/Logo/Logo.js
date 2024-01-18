import { faBrain } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Logo() {
  return (
    <div className='text-3xl text-center py-4 font-heading'>
      Blog AI
      <FontAwesomeIcon icon={faBrain} className='text-slate-200 text-2xl' />
    </div>
  )
}
