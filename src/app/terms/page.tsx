import Footer from "@/components/Footer";
import { InfoIcon, ListChecksIcon, RussianRuble } from "lucide-react";

type Props = {};

const Terms = async (props: Props) => {
  return (
    <div className="flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0">
      <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
        Условия пользования
      </h1>
      <div className="mt-5 font-bold">
        Ответственность пользователя и платформы
      </div>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <InfoIcon className="w-12 h-12 mr-3 text-blue-400" />
        <p>
          Пользователь несет ответственность за использование материалов,
          сгенерированных на платформе. Платформа не несет ответственности за
          любые возможные последствия использования этих материалов
          пользователем.
        </p>
      </div>
      <div className="mt-5 font-bold">Администрирование контента</div>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <InfoIcon className="w-12 h-12 mr-3 text-blue-400" />
        <p>
          Платформа администрирует размещаемый на ней контент по мере
          возможности. Это включает в себя модерацию и управление контентом,
          чтобы обеспечить его соответствие стандартам и политике платформы.
        </p>
      </div>
      <div className="mt-5 font-bold">Ограничения использования</div>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <InfoIcon className="w-12 h-12 mr-3 text-blue-400" />
        <p>
          Пользователь не имеет права использовать материалы платформы для
          недобросовестных целей или в нарушение законодательства.
        </p>
      </div>
      <div className="mt-5 font-bold">Изменения в условиях использования</div>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <InfoIcon className="w-12 h-12 mr-3 text-blue-400" />
        <p>
          Платформа имеет право вносить изменения в условия использования в
          любое время. Пользователи обязаны регулярно проверять и принимать
          любые изменения в условиях использования.
        </p>
      </div>
      <div className="mt-5 font-bold">Конфиденциальность и безопасность</div>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <InfoIcon className="w-12 h-12 mr-3 text-blue-400" />
        <p>
          Платформа обязуется соблюдать конфиденциальность пользовательских
          данных и обеспечивать безопасность пользовательских данных.
        </p>
      </div>
      <div className="mt-5 font-bold">Связанные условия</div>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <InfoIcon className="w-12 h-12 mr-3 text-blue-400" />
        <p>
          Условия использования могут включать ссылки на другие документы, такие
          как политика конфиденциальности и условия использования сторонних
          сервисов.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
