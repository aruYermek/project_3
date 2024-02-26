document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/profile");
        const userData = await response.json();

        document.getElementById("name").innerHTML = userData.name;
        document.getElementById("email").innerHTML = userData.email;
        document.getElementById("bio").innerHTML = userData.bio;

        // Обновление аватарки
        const avatarImg = document.getElementById("avatar");
        if (userData.avatar) {
           
            avatarImg.src = `/uploads/${userData.avatar}`;
        } else {
           
            avatarImg.src = "/";
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
    }
});

document.getElementById('editProfileBtn').addEventListener('click', function() {
  document.querySelector('.edit-profile-btn').style.display = 'none'; // Скрыть кнопку "Edit Account"
  document.querySelector('.edit-profile-form').style.display = 'block'; // Отобразить форму редактирования
});
  document.getElementById('addFriendButton').addEventListener('click', function() {
    document.querySelector('.addFriendDiv').style.display = 'none';
    document.querySelector('.searchFormDiv').style.display = 'block';
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
document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();


    const formData = new FormData(this);
    const searchQuery = formData.get('searchQuery'); 

    try {
        const response = await fetch(`/users/search?email=${searchQuery}`);
        const users = await response.json();

        console.log("Yes!")
        
    } catch (error) {
        console.error('Error searching users:', error);
       
    }
});
