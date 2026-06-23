<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\KategoriModel;

class KategoriController extends ResourceController
{
    protected $modelName = 'App\Models\KategoriModel';
    protected $format    = 'json';

    // 1. Ambil Semua Kategori (GET /api/kategori)
    public function index()
    {
        $data = $this->model->findAll();
        return $this->respond($data, 200);
    }

    // 2. Tambah Kategori Baru (POST /api/kategori)
    public function create()
    {
        $data = $this->request->getJSON(true);

        if (!$this->model->insert($data)) {
            return $this->fail($this->model->errors());
        }

        return $this->respondCreated([
            'status'   => 201,
            'messages' => ['success' => 'Kategori berhasil ditambahkan']
        ]);
    }

    // 3. Edit Kategori (PUT /api/kategori/id)
    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        if (!$this->model->update($id, $data)) {
            return $this->fail($this->model->errors());
        }

        return $this->respond([
            'status'   => 200,
            'messages' => ['success' => 'Kategori berhasil diperbarui']
        ]);
    }

    // 4. Hapus Kategori (DELETE /api/kategori/id)
    public function delete($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Kategori tidak ditemukan');
        }

        $this->model->delete($id);
        return $this->respondDeleted([
            'status'   => 200,
            'messages' => ['success' => 'Kategori berhasil dihapus']
        ]);
    }
}