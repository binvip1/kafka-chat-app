package distributed.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import model.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class MessageConsumer {
    private static final String KAFKA_TOPIC = "chat";
    private static final String GROUP_ID = "group-chat-1";

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @KafkaListener(
            topics = KAFKA_TOPIC,
            groupId = GROUP_ID
    )
    public void listen(Message message) {
        System.out.println("Consumer is part of consumer group " + GROUP_ID);
        System.out.println("Incoming message: " + message);

        simpMessagingTemplate.convertAndSend("/topic/group", message);
    }
}
