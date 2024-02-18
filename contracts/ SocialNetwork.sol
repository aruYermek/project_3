// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SocialNetwork {
    // Структура для представления друзей
    struct Friend {
        address friendAddress;
        bool exists;
    }

    // Маппинг для хранения списков друзей каждого пользователя
    mapping(address => mapping(address => Friend)) private friends;

    // Функция для добавления друга
    function addFriend(address _friend) external {
        require(_friend != msg.sender, "Cannot add yourself as a friend");
        require(!friends[msg.sender][_friend].exists, "Already friends");

        friends[msg.sender][_friend] = Friend(_friend, true);
        friends[_friend][msg.sender] = Friend(msg.sender, true);
    }

    // Функция для удаления друга
    function removeFriend(address _friend) external {
        require(friends[msg.sender][_friend].exists, "Not friends");

        delete friends[msg.sender][_friend];
        delete friends[_friend][msg.sender];
    }

    // Функция для получения списка друзей
    function getFriends() external view returns (address[] memory) {
        // TODO: Реализовать логику получения списка друзей для конкретного пользователя
    }

    // Функция для проверки дружбы
    function isFriend(address _user, address _friend) external view returns (bool) {
        return friends[_user][_friend].exists;
    }
}
