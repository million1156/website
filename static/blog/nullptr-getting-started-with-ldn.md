# Getting Started with Suyu's LDN (Local Wireless)

Before Suyu, there was Yuzu. And the Yuzu developers, one day, chose to implement LDN (Local Wireless Multiplayer) which emulated Nintendo's local wireless stack. This post won't go into the details of Nintendo's stack, since this is a post to document the undocumented: Yuzu's closed-source lobby-listing and authentication API.

## Initial Authentication

The lobby server operates using key-like authentication. You sign up on some external site, which then provides you with a key, base64 encoded in the following format: <br/><br/>
`username:[random hex data]`<br/><br/>
The difficulty of generating this key is that:<br/>

-   The longer your username is, the less secure it becomes
-   The base64 is limited to 80 characters. Calculating that length is hard.
-   Generally parsing it is a nuisance (what if the username contains a colon?)<br/><br/>

Once you've worked around that, you generate a key. In Suyu/Yuzu, go into the settings and attempt to verify it. This may first send a request to `/jwt/external/key.pem` in order to retrieve the JWT public key. The server will send a valid key in .pem format.<br/><br/>

Next, it'll send a POST request to `/jwt/internal`, with the username and token in `x-username` and `x-token` headers respectively. The server will verify the username and token combination, then sign a JWT for you using RS256 and send it back. This JWT is then verified against the pubkey, then used for all future requests.<br/><br/>

Finally, it GETs /profile, which will decode your JWT, find your user and return your username (`{ username: string }`). This is to verify that the JWT is valid and that the user exists.<br/><br/>

## Lobby Listing

Here are all the types for lobbies ("rooms") used in the suyu codebase:<br/><br/>

```ts
export interface IRoom {
	address: string;
	description: string;
	externalGuid: string;
	hasPassword: boolean;
	id: string;
	maxPlayers: number;
	name: string;
	netVersion: number;
	owner: string;
	players: RoomPlayer[];
	port: number;
	preferredGameId: number;
	preferredGameName: string;
}

export interface RoomPlayer {
	gameId: number;
	gameName: string;
	nickname: string;
}
```

<br /><br />
`GET /lobby` takes no parameters (other than an auth header, Bearer {token} afaik) and returns a list of rooms, `{ rooms: IRoom[] }`.<br/><br/>

`POST /lobby` takes a JSON body of type `IRoom` (ish) and returns the room info. This is used to create a room.<br/><br/>

`POST /lobby/{id}` takes a JSON body of type `{ players: RoomPlayer[] }` and returns `{ message: "Lobby successfully updated." }`. This is used to update the room's player list, and should only be able to be called by the room's owner.<br/><br/>

`DELETE /lobby/{id}` takes no parameters and returns the room's info as an `IRoom`. This is used to delete a room, and should also only be able to be called by the room's owner.<br/><br/>

## Conclusion

This is a very basic overview of the LDN API. It's not very complex, but it's also not very well documented. Hopefully this post will help you understand how to use it. If you have any questions, tag me in the Discord (`notnullptr`) or check the source code for more information. I hope this post was helpful to you. Good luck!
