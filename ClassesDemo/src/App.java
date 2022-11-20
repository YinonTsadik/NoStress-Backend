public class App {
    public static void main(String[] args) {
        Controller controller = new Controller(30, 7);
        controller.optimization();
        System.out.println(controller.getAllDays());
    }
}