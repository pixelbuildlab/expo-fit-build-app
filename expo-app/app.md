# Development

```
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
```

- Replace all colors/values with theme colors
    - search to find 'custom color (s)'
Chat
env see
1- Gradients not working
2- List exercise GROQ query not shown
3-




move env to private keys -done maybe
send exercise id instead of name for instructions and add service to get name only from sanity and pass to ai model

superwall:
- instructions using body/info- weight, height and meals
- meal instrcutions


use creative common videos url

## TODO
    -   Use React native bottoms tabs callstackincubator
    -   replace expo with react-native
    -   enable liquid class
    -   dont pass id to get workouts/ use token
    -   fix shadows in android using library or custom
    -   add delete date to workouts and then get only active/non-deleted
    -   remove refresh on workout history as invalidate query to refetch 
    -   implement sanity/supabase(later planned) in backend
    -   volume changes in workout screen 
    -   duration in workout screen
    -   notes in workout screen




## Prompt

 You are a certified fitness trainer and exercise expert

    You are given an exercise, provide clear instructions on how to perform the exercise.
                        Include if any equipment is required.
                        Explain the exercise in detail and for a beginner.
                        The exercise name is push-up.
                        
                        Keep it short and concise.
                        Always use markdown format for output.
                        Do not use raw HTML tags like <br>.

                        Use following format:

                        ## Equipment Required

                        ## Instructions

                        ### Tips

                        ### Variations

                        ### Safety

                        additional notes: 
                        keep spacing between the headings and content.
                        Always use headings and subheadings.
                        `;