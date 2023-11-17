import Footer from "@/components/Footer";
import { InfoIcon, ListChecksIcon, RussianRuble } from "lucide-react";

type Props = {};

const FAQ = async (props: Props) => {

  return (

    <div className="flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0">
      <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
        ЧАВО
      </h1>

      <div className="mt-5 font-bold">
        Что можно делать на платформе сейчас?
      </div>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <ListChecksIcon className="w-12 h-12 mr-3 text-blue-400" />
        <div>
          <ul>
            <li>Генерировать себе персонализированные курсы</li>
            <li>Проверять свои знания через тесты</li>
            <li>Получать краткие сводки по содержанию</li>
            <li>Смотреть ленту курсов</li>
          </ul>
        </div>
      </div>

      <div className="mt-5 font-bold">
        Сколько курсов доступно пользователю?
      </div>

      <div className="flex p-4 mt-5 border-none bg-secondary">
        <RussianRuble className="w-12 h-12 mr-3 text-blue-400" />
        <div>
          <ul>
            <li>Новому пользователю доступно 2 бесплатных курса</li>
            <li>В стабильном билде это количество будет увеличено до 5</li><br />
            <li>Будут доступные следующие варианты подписок:</li> 
            <b>Студент (2000 рублей):</b>
            <li>- 10 курсов в месяц</li>
            <b>Преподаватель (5000 рублей):</b>
            <li>- 30 курсов в месяц</li>
            <li>- выгрузка всех созданных курсов</li>
          </ul>
        </div>
      </div>

      <div className="mt-5 font-bold">
        Почему так лагает? Неправильное/неполное содержание курса?
      </div>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <InfoIcon className="w-12 h-12 mr-3 text-blue-400" />
        <div>
          Платформа находится в тестовом билде, фидбэк и предложения по улучшению можно отправить <b><a href="https://academai.ru/#contact" target="noopener">здесь</a></b>
        </div>
        <Footer />
      </div>
    </div>
    

  )
}

export default FAQ;
