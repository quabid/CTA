import axios from 'axios';
import { stringify, objectKeysCount, hashPassword } from '../custom_modules/index.js';
const allUsers = process.env.ALL_USERS;
const findUser = process.env.DB_FIND_USER_BASE;
const newUser = process.env.DB_ADD_NEW_USER_BASE;
const newUserProfile = process.env.DB_ADD_USER_PROFILE_BASE;
const updateUserProfile = process.env.DB_UPDATE_USER_PROFILE_BASE;
const findUserProfile = process.env.DB_FIND_USER_PROFILE_BASE;
const updateUser = process.env.DB_UPDATE_USER_BASE;

/* Curl Examples
url -d '{"selector":{"email":"anita@email.net"}}' -H 'Content-Type: application/json' http://sjhadmin:admin54321@192.168.1.20:5984/saintjohnsusers/_find
 */

// Get all users
export const getAllUsers = async () => {
	return await axios({
		method: 'get',
		url: allUsers
	});
};

// Find user by email
export const findUserByEmail = async (email) => {
	return await axios({
		method: 'post',
		url: findUser,
		data: {
			selector: {
				email: email
			}
		}
	});
};

// Find user by id
export const findUserByIdAndRev = async (id, rev) => {
	return await axios({
		method: 'post',
		url: findUser,
		data: {
			selector: {
				_id: id,
				_rev: rev
			}
		}
	});
};

// Add new user
export const addUser = async (email, password, type, id) => {
	return await axios({
		method: 'post',
		url: newUser,
		data: {
			docs: [
				{
					_id: id,
					email: email,
					password: password,
					type: type,
					admin: false
				}
			]
		}
	});
};

// Update user email
export const updateEmail = async (id, rev, updateObject) => {
	return await axios({
		method: 'put',
		url: `${updateUser}/${id}`,
		data: updateObject,
		headers: {
			'If-Match': rev
		}
	});
};

// Update user password
export const updatePassword = async (id, rev, password) => new Promise().resolve({ id, rev, password });

// Create user profile
export const createProfile = async (id) => {
	return await axios({
		method: 'post',
		url: newUserProfile,
		data: {
			docs: [
				{
					user: id
				}
			]
		}
	});
};

// Get user profile
export const getUserProfile = async (id) => {
	return await axios({
		method: 'post',
		url: findUserProfile,
		data: {
			selector: {
				user: id
			}
		}
	});
};

// Create user todo
export const createTodo = async (id, uid) => new Promise().resolve({ id, uid });

// Update user profile
export const updateProfile = async (id, rev, updateObject) => {
	return await axios({
		method: 'put',
		url: `${updateUserProfile}/${id}`,
		data: updateObject,
		headers: {
			'If-Match': rev
		}
	});
};

// Delete user
export const deleteUser = async (id, rev) => new Promise().resolve({ id, rev });
