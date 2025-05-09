import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';

export function App() {
    const users = [
        {
            userName: 'spin_chan',
            name: 'Spincel',
            isFollowing: true,
        },
        {
            userName: 'grandeiii',
            name: 'Grande',
            isFollowing: true,
        },
        {
            userName: 'Shietza',
            name: 'Paula',
            isFollowing: true,
        },
        {
            userName: 'isabellaS96',
            name: 'Isabella',
            isFollowing: false,
        },
        {
            userName: 'neoTp',
            name: 'Jose',
            isFollowing: true,
        },
    ];

    return (
        <>
            <section className='App'>
                {
                    users.map(({ userName, name, isFollowing }) => (
                        <TwitterFollowCard
                            key={userName}
                            userName={userName}
                            initialIsFollowing={isFollowing}
                        >
                            {name}
                        </TwitterFollowCard>
                    ))
                }


            </section>
        </>
    );
}