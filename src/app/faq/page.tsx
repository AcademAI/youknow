import Footer from "@/components/Footer";
import { InfoIcon, ListChecksIcon, RussianRuble } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {};

const FAQ = async (props: Props) => {
  return (
    <section className="py-8 mx-auto max-w-7xl overflow-hidden">
      <div className=" flex items-center justify-center ">
        <h1 className="self-center text-3xl font-bold text-center">FAQ</h1>
      </div>

      <Accordion
        className="flex flex-col mx-auto sm:max-w-full max-w-2xl"
        type="single"
        collapsible
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Функциональные возможности</AccordionTrigger>
          <AccordionContent>
            <ul>
              <li>- Пройти регистрацию через ссылку или сторонние сервисы</li>
              <li>
                - Сгенерировать себе персонализированные курсы на любую тематику
              </li>
              <li>- Искать доступные курсы от других пользователей</li>
              <li>- Просматривать видеоуроки в доступных вам курсах</li>
              <li>
                - Решать автоматически сгенерированные тесты по видеоуроку
              </li>
              <li>
                - Обращаться к ИИ-ассистенту за помощью в обучении (скоро)
              </li>
              <li>- Редактировать или удалить свой аккаунт</li>
              <li>- Редактировать или удалить курс</li>
              <li>- Отслеживать статистику прохождения курсов</li>
              <li>- Отслеживать других пользователей</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Ограничения на генерацию</AccordionTrigger>
          <AccordionContent>
            На данный момент всем пользователям доступна неограниченная
            генерация, это может измениться в будущем.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Производительность и ошибки</AccordionTrigger>
          <AccordionContent>
            Платформа находится в тестовом билде, фидбэк и предложения по
            улучшению можно отправить{" "}
            <b>
              <a href="https://academai.ru/#contact" target="noopener">
                здесь
              </a>
            </b>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Контакты</AccordionTrigger>
          <AccordionContent>
            <b></b>
            <ul>
              <li>
                <a href="https://t.me/academ_ai" target="noopener">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://vk.com/academai" target="noopener">
                  VK
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@academai11" target="noopener">
                  YouTube
                </a>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQ;
