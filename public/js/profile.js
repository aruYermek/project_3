document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("/profile"); // Отправляем запрос на сервер для получения данных профиля
        if (!response.ok) {
            throw new Error('Failed to fetch profile data');
        }

        const userData = await response.json(); // Получаем данные о пользователе из ответа

        // Обновляем HTML элементы на странице профиля с данными о пользователе
        document.getElementById("name").innerText = userData.name;
        document.getElementById("email").innerText = userData.email;
        document.getElementById("bio").innerText = userData.bio;
        document.getElementById("avatar").innerText = userData.avatar;


        // Опционально, если есть другие данные о пользователе, такие как аватар, обновите их соответственно

    } catch (error) {
        console.error("Error fetching profile data:", error);
    }
});

document.getElementById('editProfileBtn').addEventListener('click', function () {
document.querySelector('.edit-profile-btn').style.display = 'none';
document.querySelector('.edit-profile-form').style.display = 'block';
});

document.getElementById('addFriendButton').addEventListener('click', function () {
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
  async function searchUser() {
    const searchEmail = document.getElementById('searchEmail').value.trim();

    try {
        const response = await fetch(`/search?email=${searchEmail}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to search for user');
        }

        const userData = await response.json();

        if (userData) {
            const searchResultsDiv = document.getElementById('searchResults');
            searchResultsDiv.innerHTML = `<p><strong>Name:</strong> ${userData.name}</p>
                                          <p><strong>Email:</strong> ${userData.email}</p>
                                          <p><strong>Bio:</strong> ${userData.bio}</p>
                                          <button id="addFriendButton" class="btn btn-dark">Add As Friend</button>
                                          `;
        } else {
            const searchResultsDiv = document.getElementById('searchResults');
            searchResultsDiv.innerHTML = "<p>No user found</p>";
        }
    } catch (error) {
        console.error('Error searching for user:', error);
    }
}

document.getElementById('addFriendButton').addEventListener('click', function () {
 
    const receiverAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    addFriendRequest(receiverAddress);
  });

