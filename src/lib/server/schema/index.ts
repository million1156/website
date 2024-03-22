import type { Role } from "$types/db";
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class SuyuUser extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("text")
	username: string;

	@Column("text")
	displayName: string;

	@Column("text")
	avatarUrl: string;

	@Column("json")
	roles: Role[];

	@Column("text", {
		select: false,
	})
	apiKey: string;

	@Column("text", {
		select: false,
	})
	email: string;

	@Column("text", {
		select: false,
	})
	password: string;

	@OneToMany(() => Friendship, (friendship) => friendship.from, {
		eager: true,
	})
	sentFriendRequests: Friendship[];

	@OneToMany(() => Friendship, (friendship) => friendship.to, {
		eager: true,
	})
	receivedFriendRequests: Friendship[];

	async getFriendRequests() {
		return await Friendship.find({
			where: {
				to: {
					id: this.id,
				},
				accepted: false,
			},
			loadEagerRelations: true,
			relations: ["from", "to"],
		});
	}

	async getFriends() {
		const sent = await Friendship.find({
			where: {
				from: this,
				accepted: true,
			},
		});
		const received = await Friendship.find({
			where: {
				to: this,
				accepted: true,
			},
		});
		return sent.map((f) => f.to).concat(received.map((f) => f.from));
	}
}

@Entity()
export class Friendship extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => SuyuUser, (user) => user.sentFriendRequests)
	@JoinColumn()
	from: SuyuUser;

	@ManyToOne(() => SuyuUser, (user) => user.receivedFriendRequests)
	@JoinColumn()
	to: SuyuUser;

	@Column("boolean")
	accepted: boolean;
}
