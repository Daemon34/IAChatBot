using OpenAI;
using OpenAI.Chat;
using System.ClientModel;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", policy => {
        policy.WithOrigins("http://localhost:5173") // Port par défaut de Vite
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowReact");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

var GroqAPIKey = Environment.GetEnvironmentVariable("GROQ_API_KEY");
if(String.IsNullOrEmpty(GroqAPIKey)){
    throw new Exception("Make sure environment variable GROQ_API_KEY is set before starting the application !");
}

ChatClient client = new(
    model: "openai/gpt-oss-20b",
    credential: new ApiKeyCredential(Environment.GetEnvironmentVariable("GROQ_API_KEY")),
    options: new OpenAIClientOptions()
    {
        Endpoint = new Uri("https://api.groq.com/openai/v1")
    }
);

app.MapPost("/chat", async (ChatHistoryRequest request, ILogger<Program> logger) => {
    try {
        var history = new List<ChatMessage>();

        foreach(var msg in request.Messages){
            if(msg.Role == "user"){
                history.Add(ChatMessage.CreateUserMessage(msg.Content));
            } else {
                history.Add(ChatMessage.CreateAssistantMessage(msg.Content));
            }
        }

        ChatCompletion completion = await client.CompleteChatAsync(history);
        return Results.Ok(new { role = "assistant", content = completion.Content[0].Text });
    } catch (Exception ex) {
        logger.LogError(ex, $"[ERREUR CRITIQUE] : {ex.Message}", request.Messages);
        return Results.Problem("Erreur Interne Backend");
    }
});

app.Run();

public record ChatHistoryRequest(List<MessageItem> Messages);
public record MessageItem(string Role, string Content);