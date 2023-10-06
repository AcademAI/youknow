import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

type Props = {};

const Home = async (props: Props) => {
  return (
    <div className="py-8 mx-auto max-w-7xl">
      <Head>
        <title>Startup Name</title>
        <meta name="description" content="Description of your startup" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="space-y-8">
        <section>
          <h1 className="text-4xl font-bold mb-4">Описание проекта</h1>
          <p>Ваше описание проекта здесь.</p>
        </section>

        <section>
          <h1 className="text-4xl font-bold mb-4">Функционал</h1>
          <p>Описание функционала вашего продукта здесь.</p>
        </section>

        <section>
          <h1 className="text-4xl font-bold mb-4">Планы подписок</h1>
          <p>Описание ваших планов подписок здесь.</p>
        </section>

        <section>
          <h1 className="text-4xl font-bold mb-4">Контакты</h1>
          <p>Ваши контактные данные здесь.</p>
        </section>
      </main>
    </div>
  );
}

export default Home;
