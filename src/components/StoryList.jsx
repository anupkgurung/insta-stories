function StoryList({ users, onUserClick }) {
  return (
    <div className="story-list">
      {users.map((user, index) => (
        <div
          key={user.username}
          className="story-thumbnail"
          onClick={() => onUserClick(index)}
        >
          <img src={user.stories[0].imageUrl} alt={user.username} className="thumbnail-img" />
          <span className="username">{user.username}</span>
        </div>
      ))}
    </div>
  );
}

export default StoryList;
