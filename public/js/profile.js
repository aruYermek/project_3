window.onload = async function() {
    try {
        const response = await fetch('/users'); // Получаем данные пользователя с сервера
        const userData = await response.json();
        const user = userData[0]; // Предполагается, что вы получаете только одного пользователя
        
        document.getElementById('avatar').src = user.avatar;
        document.getElementById('name').innerText = user.name;
        document.getElementById('email').innerText = user.email;
        document.getElementById('bio').innerText = user.bio;

        // Отобразите посты пользователя
        const postsContainer = document.getElementById('posts');
        user.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `<p>${post}</p>`;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error while retrieving user data:', error);
    }
};

document.getElementById('editProfileBtn').addEventListener('click', function() {
  document.querySelector('.edit-profile-btn').style.display = 'none'; // Скрыть кнопку "Edit Account"
  document.querySelector('.edit-profile-form').style.display = 'block'; // Отобразить форму редактирования
});


document.getElementById('editProfileForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  
  try {
      const response = await fetch('/edit-profile', {
          method: 'POST',
          body: formData
      });
      
      if (!response.ok) {
          throw new Error('Failed to update profile');
      }
      
      const responseData = await response.json();
      const bio = formData.get('bio');
      const avatarFile = formData.get('avatar');
      
      document.getElementById('bio').innerText = bio; 
      if (avatarFile) {
          const avatarURL = URL.createObjectURL(avatarFile); 
          document.getElementById('avatar').src = avatarURL; 
      }
      
      document.querySelector('.edit-profile-btn').style.display = 'block';
      document.querySelector('.edit-profile-form').style.display = 'none';
      
      alert('Profile updated successfully');
  } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
  }
});
