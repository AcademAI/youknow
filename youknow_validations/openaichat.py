from langchain.schema import HumanMessage, SystemMessage
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain.output_parsers import ResponseSchema, StructuredOutputParser
import tenacity
from tenacity import retry, stop_after_attempt, wait_fixed
import httpx
import json


class OpenAIChatImpl:
    def __init__(self, **kwargs):
 
        self.openaichat = ChatOpenAI(api_key=kwargs.get('OPENAI_API_KEY'), 
        http_client=httpx.Client(proxies=f'http://{kwargs.get("PROXY_LOGIN")}:{kwargs.get("PROXY_PASSWORD")}@{kwargs.get("PROXY_IP")}:{kwargs.get("PROXY_PORT")}/'), 
        verbose=False, 
        temperature=0.1, 
        max_retries=3)


    async def createUnitsNChapters(self, title, units):
        units_list = units.split(",")
        response_schemas = []

        for i, unit in enumerate(units_list, start=1):
            chapters_schema = ResponseSchema(name=f'chapters{i}', description=f'3 главы {i}-го раздела', type='List[{youtube_search_query: string, chapter_title: string}]')
            response_schemas.append(chapters_schema)

        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
        format_instructions = output_parser.get_format_instructions()

        template_string = """Ты - помощник, способный курировать содержание курса. \
        Ты можешь придумывать соответствующие названия глав и придумывать поисковые запросы youtube для каждой главы

        Твоя задача - создать курс о ```{title}``` 
        У тебя есть разделы курса ```{units}``` , тебе нужно сгенерировать для каждого раздела 3 новые главы на отдельные подтемы
        Затем для каждой главы сгенерируй поисковый запрос в youtube_search_query и название chapter_title.

        Строго придерживайся формата! Содержимое на русском.

        {format_instructions}
        """
        prompt = ChatPromptTemplate.from_template(template=template_string)
        messages = prompt.format_messages(title=title, 
                                            units=units,
                                            unitsLength=len(units),
                                            format_instructions=format_instructions)
        
        response = self.openaichat(messages)
        response_as_dict = output_parser.parse(response.content)
        print(response_as_dict)
        result = []

        # Get the chapters from the response_as_dict
        chapters_list = list(response_as_dict.values())

        # Map the units to the chapters by order
        result = [{"title": unit, "chapters": chapters} for unit, chapters in zip(units_list, chapters_list)]

        # Convert the result to JSON
        result_json = json.dumps(result, indent=4)

        return result_json

        # What we get here
        """[
            { title: 'functions', chapters: [ [Object], [Object], [Object] ] },
            { title: 'classes', chapters: [ [Object], [Object], [Object] ] },
            { title: 'decorators', chapters: [ [Object], [Object], [Object] ] }
        ]"""
    
    async def createImageSearchTerm(self, title):
        response_schemas = []
        chapters_schema = ResponseSchema(name=f'image_search_term', description=f'a good prompt for course thumbnail generation', type='prompt')
        response_schemas.append(chapters_schema)

        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
        format_instructions = output_parser.get_format_instructions()
        print(format_instructions)

        template_string = """You are an assistant capable of evaluating the best prompt for course thumbnail generation. \
        Please provide a good prompt for midjourney to generate a good image about: ```{title}``` 

        Return a valid JSON object with only 1 key and 1 value.

        {format_instructions}
        """
        prompt = ChatPromptTemplate.from_template(template=template_string)
        messages = prompt.format_messages(title=title, 
                                            format_instructions=format_instructions)
        
        response = self.openaichat(messages)
        #print(response.content)
        response_as_dict = output_parser.parse(response.content)
       #print(response.content)
        print(response_as_dict)

        # Convert the result to JSON
        result_json = json.dumps(response_as_dict, indent=4)
        

        return result_json

        # What we get here
        """[ { image_search_term: 'a good search term for the title of the course' } ]"""
        
    async def createYoutubeSummary(self, transcript):
        response_schemas = []
        chapters_schema = ResponseSchema(name=f'summary', description=f'краткое содержание транскрипта', type='your_summary')
        response_schemas.append(chapters_schema)

        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
        format_instructions = output_parser.get_format_instructions()
        print(format_instructions)

        template_string = """Ты - помощник, способный делать краткое содержание транскрипта youtube видео.  \
        Сделай краткое содержание в 250 словах или менее, не говори о спонсорах или рекламе, не имеющих отношения к основной теме текста далее 

        ```{transcript}```
               

        В ответе верни JSON объект с одним ключем и одним значением. Содержимое на русском.
        
        {format_instructions}
        """
        prompt = ChatPromptTemplate.from_template(template=template_string)
        messages = prompt.format_messages(transcript=transcript, 
                                            format_instructions=format_instructions)
        
        response = self.openaichat(messages)
        print(response.content)
        response_as_dict = output_parser.parse(response.content)

        
        print(response_as_dict)

        # Convert the result to JSON
        result_json = json.dumps(response_as_dict, indent=4)

        return result_json

        # What we get here
        """[ { summary: 'краткое содержание видео' } ]"""
        
    async def getQuestionsFromTranscript(self, transcript, chapterName):
        response_schemas = []
        chapters_schema = ResponseSchema(name=f'questions', 
            description=f'вопросы к видеоуроку', 
            type='List[{question: string, answer: string, option1: вариант1, option2: вариант 2, option3: вариант 3}]')
        response_schemas.append(chapters_schema)

        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
        format_instructions = output_parser.get_format_instructions()
        print(format_instructions)

        template_string = """"Ты - помощник, способный генерировать вопросы и ответы, длина каждого Q или A не должна превышать 15 слов. 
        
        Сгенерируй 5 сложных вопросов с несколькими вариантами ответа о главе: ```{chapterName}``` на основе текста: ```{transcript}```

        Строго придерживайся формата! Содержимое на русском.

        {format_instructions}
        """
        prompt = ChatPromptTemplate.from_template(template=template_string)
        messages = prompt.format_messages(transcript=transcript, 
                                            chapterName=chapterName,
                                            format_instructions=format_instructions)
        
        response = self.openaichat(messages)
        print(response.content)
        response_as_dict = output_parser.parse(response.content)

        
        print(response_as_dict)

        # Convert the result to JSON
        result_json = json.dumps(response_as_dict, indent=4)

        return result_json

        # What we get here
        """[ { summary: 'краткое содержание видео' } ]"""

    async def checkResult(self, title, units, policies):

        summary = title + ' ' + units
        response_schemas = []
        chapters_schema = ResponseSchema(name=f'decision', description=f'decision about publishing', type='true/false')
        response_schemas.append(chapters_schema)
        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
        format_instructions = output_parser.get_format_instructions()

        template_string = """Ты - помощник, способный проверить решение о публикации курса. \
        Твоя задача - проверить текст ```{summary}``` на любое содержание или/и намек на наличие запрещенных тематик из списка: \
        ```{policies}```.

        В случае соответствия текста запрещенным тематикам в ответе верни false, иначе верни true. \

        В ответе верни JSON объект с одним ключем и одним значением.

        {format_instructions}
        """
        prompt = ChatPromptTemplate.from_template(template=template_string)
        messages = prompt.format_messages(summary=summary,
                                            policies=policies, 
                                            format_instructions=format_instructions)
        
        response = self.openaichat(messages)
        
        response_as_dict = output_parser.parse(response.content)
        result_json = json.dumps(response_as_dict, indent=4)

        return result_json

        # What we get here
        """
        [
            {
                "decision": true/false
            }
        ]
        """


    async def call_openai(self, action, title, units, chapterName, transcript, policies):
        if action == 'createUnitsNChapters':
            return await self.createUnitsNChapters(title, units)
        elif action == 'createImageSearchTerm':
            return await self.createImageSearchTerm(title)
        elif action == 'createYoutubeSummary':
            return await self.createYoutubeSummary(transcript)
        elif action == 'getQuestionsFromTranscript':
            return await self.getQuestionsFromTranscript(transcript, chapterName)
        elif action =='checkResult':
            return await self.checkResult(title, units, policies)