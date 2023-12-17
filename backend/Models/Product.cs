using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Product
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public string PartNumber { get; set; }
        public int Size { get; set; }
    }
}
