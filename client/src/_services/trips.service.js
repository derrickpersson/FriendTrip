export const tripService = {
  getAllTrips
}

function getAllTrips(user) {
  const requestOptions = {
    method: 'GET'
  };

  return fetch(`http://localhost:3000/api/${user.id}/trips`, requestOptions).then(handleResponse);
}

function handleResponse(response){
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}