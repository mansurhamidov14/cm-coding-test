import { IUser } from "./models";

export const mockUsers: IUser[] = [
    {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        password: 'x2389_3!',
        avatarUrl: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
        firstName: 'Alessandro',
        lastName: 'Del Piero',
        username: 'adp1974',
        password: 's983_A3$',
        avatarUrl: 'https://www.footballkitarchive.com/static/logos/players/Alessandro%20Del%20Piero.jpg'
    },
    {
        firstName: 'Gianluigi',
        lastName: 'Buffon',
        username: 'gigibuffon1',
        password: '3sa3!z93',
        avatarUrl: 'https://www.footballkitarchive.com/static/logos/players/Gianluigi%20Buffon.jpg'
    }
]