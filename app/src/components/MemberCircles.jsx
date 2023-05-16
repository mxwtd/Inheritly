const MemberCircles = ({ users }) => {
  return (
    <div className='flex -space-x-4'>
      {users.map((user, index) => (
        <img
          key={index}
          className='w-10 h-10 border-2 rounded-full border-slate-600 dark:border-slate-300'
          src={user.profilePic}
          alt=''
        />
      ))}
    </div>
  )
}

export default MemberCircles
