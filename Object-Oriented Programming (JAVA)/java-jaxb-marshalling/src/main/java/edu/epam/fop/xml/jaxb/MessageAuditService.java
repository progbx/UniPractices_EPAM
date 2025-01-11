package edu.epam.fop.xml.jaxb;

import edu.epam.fop.xml.jaxb.model.Message;
import edu.epam.fop.xml.jaxb.model.Messages;
import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Marshaller;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Stream;

public class MessageAuditService {

  public void writeFilteredMessages(Path output, Stream<Message> messages, Predicate<Message> filter) {
    try {
      JAXBContext context = JAXBContext.newInstance("edu.epam.fop.xml.jaxb.model");
      Marshaller marshaller = context.createMarshaller();
      marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
      marshaller.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");
      Messages messagesObject = new Messages();
      List<Message> messageList = messagesObject.getMessage();
      messages.filter(filter).forEach(messageList::add);
      Files.createDirectories(output.getParent());
      marshaller.marshal(messagesObject, output.toFile());
    } catch (JAXBException | IOException e) {
      e.printStackTrace();
    }
  }
}