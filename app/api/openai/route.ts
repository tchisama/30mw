
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});


export async function GET(request:Request){
    const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": "you will get provided with informations about a website and your work is to give and json array of collections  based on those types ,  you must return a json array [...]\n\nexport type CollectionType = {\n  collection: string\n  name: string\n  href: string,  // put here \"/dashboard/collection name\"\n  icon: string // put emoji here\n  subtitle: string\n  structure:Field[]\n  defaultView: \"grid\" \n  table:false\n}\n\n\nexport type FieldTypes = \"richText\" | \"string\" | \"image\" | \"number\" | \"boolean\" | \"date\" | \"time\" | \"select\" | \"object\" | \"array\" | \"avatar\"\n\n\nexport type Field = {\n  name: string // lowercase\n  prefix?: string\n} & (  ImageField |StringField | NumberField | BooleanField | DateField | TimeField | SelectField | ObjectField |  ArrayField )\n\n\n\n/// all the types\n\ntype StringField ={\n  type : \"string\" | \"text\" | \"richText\"\n}\ntype ImageField ={\n  type: \"image\" | \"avatar\"\n}\n\ntype NumberField ={\n  type: \"number\"\n}\n\ntype BooleanField ={\n  type: \"boolean\"\n  labels?: {\n    true: string\n    false: string\n  }\n}\n\ntype DateField ={\n  type: \"date\"\n}\n\ntype TimeField ={\n  type: \"time\"\n}\n\ntype SelectField ={\n  type: \"select\"\n  options: {\n    name:string,\n    value: string\n  }[]\n}\n\ntype ObjectField ={\n  type: \"object\" \n  structure: Field[]\n}\n\ntype ArrayField ={\n  type: \"array\"\n  structure: Field[]\n}\n\n\n\n\n"
      },
      {
        "role": "user",
        "content": "LMS website"
      },
      {
        "role": "assistant",
        "content": "[\n  {\n    \"collection\": \"Courses\",\n    \"name\": \"Courses\",\n    \"href\": \"/dashboard/courses\",\n    \"icon\": \"📚\",\n    \"subtitle\": \"Manage and track all courses\",\n    \"structure\": [\n      {\n        \"name\": \"title\",\n        \"type\": \"string\"\n      },\n      {\n        \"name\": \"description\",\n        \"type\": \"text\"\n      },\n      {\n        \"name\": \"thumbnail\",\n        \"type\": \"image\"\n      },\n      {\n        \"name\": \"instructor\",\n        \"type\": \"string\"\n      },\n      {\n        \"name\": \"price\",\n        \"type\": \"number\"\n      },\n      {\n        \"name\": \"isPublished\",\n        \"type\": \"boolean\",\n        \"labels\": {\n          \"true\": \"Published\",\n          \"false\": \"Unpublished\"\n        }\n      },\n      {\n        \"name\": \"dateCreated\",\n        \"type\": \"date\"\n      }\n    ],\n    \"defaultView\": \"grid\",\n    \"table\": false\n  },\n  {\n    \"collection\": \"Students\",\n    \"name\": \"Students\",\n    \"href\": \"/dashboard/students\",\n    \"icon\": \"🎓\",\n    \"subtitle\": \"Manage student information\",\n    \"structure\": [\n      {\n        \"name\": \"name\",\n        \"type\": \"string\"\n      },\n      {\n        \"name\": \"email\",\n        \"type\": \"string\"\n      },\n      {\n        \"name\": \"profilePic\",\n        \"type\": \"avatar\"\n      },\n      {\n        \"name\": \"enrolledCourses\",\n        \"type\": \"array\",\n        \"structure\": [\n          {\n            \"name\": \"courseId\",\n            \"type\": \"string\"\n          },\n          {\n            \"name\": \"enrollmentDate\",\n            \"type\": \"date\"\n          }\n        ]\n      }\n    ],\n    \"defaultView\": \"grid\",\n    \"table\": false\n  },\n  {\n    \"collection\": \"Quizzes\",\n    \"name\": \"Quizzes\",\n    \"href\": \"/dashboard/quizzes\",\n    \"icon\": \"📝\",\n    \"subtitle\": \"Manage and create quizzes\",\n    \"structure\": [\n      {\n        \"name\": \"title\",\n        \"type\": \"string\"\n      },\n      {\n        \"name\": \"questions\",\n        \"type\": \"array\",\n        \"structure\": [\n          {\n            \"name\": \"questionText\",\n            \"type\": \"string\"\n          },\n          {\n            \"name\": \"options\",\n            \"type\": \"array\",\n            \"structure\": [\n              {\n                \"name\": \"optionText\",\n                \"type\": \"text\"\n              },\n              {\n                \"name\": \"isCorrect\",\n                \"type\": \"boolean\"\n              }\n            ]\n          }\n        ]\n      },\n      {\n        \"name\": \"timeLimit\",\n        \"type\": \"time\"\n      }\n    ],\n    \"defaultView\": \"grid\",\n    \"table\": false\n  }\n]"
      }
    ],
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log(response)
  return new Response(
    (response as any)?.choices[0]?.message?.content
    )
}