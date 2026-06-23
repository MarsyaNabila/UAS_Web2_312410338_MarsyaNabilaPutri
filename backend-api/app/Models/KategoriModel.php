<?php

namespace App\Models;

use CodeIgniter\Model;

class KategoriModel extends Model
{
    protected $table            = 'kategori';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    
    // Sesuaikan kolom di database kamu, biasanya nama kolomnya 'nama_kategori'
    protected $allowedFields    = ['nama_kategori'];

    // Aturan validasi server-side
    protected $validationRules  = [
        'nama_kategori' => 'required|min_length[3]|max_length[100]'
    ];
}