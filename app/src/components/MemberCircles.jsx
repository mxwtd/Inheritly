const MemberCircles = ({ users }) => {
  return (
    <div className='flex -space-x-4'>
      <img className='w-10 h-10 border-2 rounded-full border-slate-600 dark:border-slate-300' src='https://res.cloudinary.com/djr22sgp3/image/upload/v1678799098/peeps-avatar_ogmqgh.png' />
      <img className='w-10 h-10 border-2 rounded-full border-slate-600 dark:border-slate-300' src='https://res.cloudinary.com/djr22sgp3/image/upload/v1678799098/peeps-avatar_ogmqgh.png' />
      <img className='w-10 h-10 border-2 rounded-full border-slate-600 dark:border-slate-300' src='https://res.cloudinary.com/djr22sgp3/image/upload/v1678799098/peeps-avatar_ogmqgh.png' />
      <img className='w-10 h-10 border-2 rounded-full border-slate-600 dark:border-slate-300' src='https://res.cloudinary.com/djr22sgp3/image/upload/v1678799098/peeps-avatar_ogmqgh.png' />
      {/* {users.map((user, index) => (
        <img
          key={index}
          className='w-10 h-10 border-2 rounded-full border-slate-600 dark:border-slate-300'
          src={user.profilePic}
          alt=''
        />
      ))} */}
    </div>
  )
}

export default MemberCircles
